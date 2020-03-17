
function calculateElo(rankA, rankB, resultA, resultB) {

	expectedA = 1 / ( 1 + (10 ^ ( (rankB-rankA) / 400)));
	expectedB = 1 / ( 1 + (10 ^ ( (rankA-rankB) / 400)));
	
	newRankA = rankA + (16 * (resultA - expectedA));
	newRankB = rankB + (16 * (resultB - expectedB));

	return {
		    "newRankA":Math.floor(newRankA),
		    "newRankB":Math.floor(newRankB)
		}
}
