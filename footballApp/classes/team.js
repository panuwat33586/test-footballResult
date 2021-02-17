

export default class Team {
    match = 0
    name = ''
    w = 0
    d = 0
    l = 0
    score = 0
    gain = 0
    lose = 0
    records=[]

    constructor(teamName){
        this.name=teamName
    }

    addMatch(){
        this.match+=1
    }

    setScoreResult(matchData,team,result){
        switch(result){
            case 'win':
                this.w+=1
                this.score+=3
                this.computeGainlose(matchData,team)
                this.setRecords('win')
                break;
            case 'draw':
                this.d+=1
                this.score+=1
                this.computeGainlose(matchData,team)
                this.setRecords('draw')
                break;
            case 'lose':
                this.l+=1
                this.computeGainlose(matchData,team)
                this.setRecords('lose')
                break;
            default:
                break;
        }
    }
    computeGainlose(matchData,team){
        switch(team){
            case 'team1':
                this.gain+=matchData.score.ft[0]
                this.lose+=matchData.score.ft[1]
                break;
            case 'team2':
                this.gain+=matchData.score.ft[1]
                this.lose+=matchData.score.ft[0]
                break;
            default:
                break;
        }
    }
    
    setRecords(result){
        if(this.records.length<5){
            this.records[this.records.length]=result
        }
        return
    }
}