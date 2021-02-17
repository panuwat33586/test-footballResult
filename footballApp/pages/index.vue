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
          <th scope="col">ได้</th>
          <th scope="col">เสีย</th>
          <th scope="col">ต่าง</th>
          <th scope="col">score</th>
          <th scope="col">5 เกมล่าสุด</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, $teamIndex) in computeEachTeamData" :key="$teamIndex">
          <td>
            {{$teamIndex+1}} {{ team.name }}
          </td>
          <td>
            {{ team.match }}
          </td>
          <td>
            {{ team.w }}
          </td>
          <td>
            {{ team.d }}
          </td>
          <td>
            {{ team.l }}
          </td>
          <td>
            {{ team.gain }}
          </td>
          <td>
            {{ team.lose }}
          </td>
          <td>
            {{ calDiff(team) }}
          </td>
          <td>
            {{ team.score }}
          </td>
           <td>
             <template  v-for="(record,$recordIndex) in team.records">
              <i 
             :key="'win'+$recordIndex"
             v-if="record=='win'"
             class="bi bi-check"
             />
              <i 
             :key="'lose'+$recordIndex"
             v-if="record=='lose'"
             class="bi bi-x"
             />
            <i 
             :key="'draw'+$recordIndex"
             v-if="record=='draw'"
             class="bi bi-dash"
             />
             </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Team from '../classes/team'
export default {
  data() {
    return {
      footballMatchDatas: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    computeEachTeamData() {
      const computedData= this.footballMatchDatas.reduce((acc, match) => {
        if (!acc[match.team1]) {
          acc[match.team1] = new Team(match.team1)
        }
        if (!acc[match.team2]) {
          acc[match.team2] = new Team (match.team2)
        }
        acc[match.team1].addMatch()
        acc[match.team2].addMatch()
        acc[match.team1].computeGainlose(match,'team1')
        acc[match.team2].computeGainlose(match,'team2')
        this.computeMatchScore(acc[match.team1], acc[match.team2],match.score.ft[0],match.score.ft[1]);
        return acc;
      }, {});
      const teamData=Object.values(computedData).sort((a,b)=>a.score>b.score?-1:1)
      return teamData
    },
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await this.$axios.get(
          "https://raw.githubusercontent.com/openfootball/football.json/master/2014-15/en.1.json"
        );
        const reduceData = data.rounds.reduce((acc, round) => {
        acc = [...acc, ...round.matches];
        return acc;
      }, []);
        const sortData=reduceData.sort((a,b)=>a.date>b.date?-1:1)
        this.footballMatchDatas=sortData
      } catch (error) {
        console.log(error);
      }
    },
    calDiff(data) {
      return data.gain - data.lose;
    },
    computeMatchScore(team1, team2,scoreTeam1,scoreTeam2) {
      if (scoreTeam1 > scoreTeam2) {
        team1.setScoreResult('win')
        team2.setScoreResult('lose')
      }else if(scoreTeam1 == scoreTeam2) {
        team1.setScoreResult('draw')
        team2.setScoreResult('draw')
      }else{
        team1.setScoreResult('lose')
        team2.setScoreResult('win')
      }
    },
  },
};
</script>

<style></style>
