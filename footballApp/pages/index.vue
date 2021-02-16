<template>
  <div class="container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Team</th>
      <th scope="col">Match</th>
      <th scope="col">W</th>
      <th scope="col">D</th>
      <th scope="col">L</th>
      <th scope="col">score</th>
    </tr>
  </thead>
  <tbody>
    <tr
    v-for="(team,$teamIndex) in computeEachTeamData"
    :key=$teamIndex
    >
      <td>
        {{team.name}}
      </td>
      <td>
        {{team.match}}
      </td>
      <td>
        {{team.w}}
      </td>
      <td>
        {{team.d}}
      </td>
      <td>
        {{team.l}}
      </td>
      <td>
        {{team.score}}
      </td>
    </tr>
  </tbody>
</table>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      footballMatchDatas:[]
    }
  },
  created(){
     this.fetchData()
  },
  computed:{
      computeEachTeamData(){
        const data=this.footballMatchDatas.reduce((acc,round)=>{
          acc=[...acc,...round.matches]
          return acc
        },[])
           return data.reduce((acc,match)=>{
            if(!acc[match.team1]){
              acc[match.team1]={match:0,name:match.team1,w:0,d:0,l:0,score:0}
            }
            if(!acc[match.team2]){
              acc[match.team2]={match:0,name:match.team2,w:0,d:0,l:0,score:0}
            }
            acc[match.team1].match+=1
            acc[match.team2].match+=1
            if(match.score.ft[0]>match.score.ft[1]){
              acc[match.team1].w+=1
              acc[match.team1].score+=3
              acc[match.team2].l+=1
            }
            if(match.score.ft[0]==match.score.ft[1]){
              acc[match.team1].d+=1
              acc[match.team2].d+=1
              acc[match.team1].score+=1
              acc[match.team2].score+=1
            }
            if(match.score.ft[0]<match.score.ft[1]){
              acc[match.team1].l+=1
              acc[match.team2].w+=1
              acc[match.team2].score+=3
            }
            return acc
          },{})
      }
  },
  methods: {
     async fetchData(){
       try{
         const {data}=await this.$axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2014-15/en.1.json')     
        this.footballMatchDatas=data.rounds
       }catch(error){
         console.log(error)
       }
     },
  },
}
</script>

<style>

</style>
