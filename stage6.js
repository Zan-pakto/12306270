import axios from 'axios';


const ip='http://4.224.186.213';
try{
    const response = await axios.get(`${ip}/evaluation-service/notifications`, {
		headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnZpbmRzaGFoaTU1NUBnbWFpbC5jb20iLCJleHAiOjE3Nzg3NjM1MTQsImlhdCI6MTc3ODc2MjYxNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjNkNDA4ZmFhLTg3MjQtNDcwYS04ZDUzLTU2NDQwNWRkNzhmMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFydmluZCBzaGFoaSIsInN1YiI6IjRhZGNmNGUyLTY1MTMtNDc5Mi05MTliLTlhZThmYjFmOTNjNyJ9LCJlbWFpbCI6ImFydmluZHNoYWhpNTU1QGdtYWlsLmNvbSIsIm5hbWUiOiJhcnZpbmQgc2hhaGkiLCJyb2xsTm8iOiIxMjMwNjI3MCIsImFjY2Vzc0NvZGUiOiJUUnZaV3EiLCJjbGllbnRJRCI6IjRhZGNmNGUyLTY1MTMtNDc5Mi05MTliLTlhZThmYjFmOTNjNyIsImNsaWVudFNlY3JldCI6ImNkblFNRENzUkJKU2NDU3MifQ.6Up51NRrWK28VBYwb-VChh3dEO58MPPkxJbXs7OZxt0'}
    });
    console.log('Fetched notifications:', response.data);
    const notifications = response.data;
    const prioritized = prioritizeNotifications(notifications, 10);
    console.log('Prioritized notifications:', prioritized);
} catch (error) {
    console.error('Error fetching notifications:', error);
}
function prioritizeNotifications(notifications, N) {
    
	if (!Array.isArray(notifications) || notifications.length === 0) return [];
	N = Math.max(0, Math.floor(N) || 0);

	const now =Date.now();
	const MS_IN_DAY =24 *60*60*1000;
	const wPlacement =0.55, wResult =0.25, wEvent =0.15,wRecency = 0.05;

	function normalizeNotification(n) {
		return {
			...n,
			id: n?.id,
			type: n?.type ?? n?.result,
			message: n?.message ?? n?.midsem ?? '',
			timestamp: typeof n?.timestamp === 'number' ? n.timestamp : Date.parse(n?.timestamp) || now,
		};
	}
	function getScore(n) {
		const ageDays =Math.max(0,(now-(n.timestamp||now))/MS_IN_DAY);
		const recency =Math.max(0.1,1 - ageDays / 30);
		return ((placementScore[n.placement] || 20) * wPlacement + (resultScore[n.type] || resultScore[n.result] || 20) * wResult + (eventScore[n.event] || 10) * wEvent) * (1 - wRecency + recency * wRecency);
	}

	const unread =notifications.filter(n => !n.read).map(normalizeNotification);

	const scored =unread.map(n => ({
		notification: n,
		score: getScore(n),
	}));

	scored.sort((a, b) => b.score -a.score);
	return scored.slice(0,N).map(s =>s.notification);
}

if (typeof module !== 'undefined' && module.exports) module.exports = prioritizeNotifications;


