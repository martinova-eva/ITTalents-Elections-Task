function print(arrWithParties, container) {
    container.innerHTML = "";
    if (arrWithParties.length >= 1) {
        arrWithParties.forEach(part => {
          let card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `<img src="${part.picture}" class="card-img-top" alt="flag.png">
                <div class="card-body">
                  <h5 class="card-title">${part.name}</h5>
                  <p class="card-text">Capital:${part.slogan}</p>
                </div>`;
          let details = document.createElement('button');
          details.classList.add('btn')
          details.classList.add('btn-primary')
          details.innerHTML = 'Details';

          details.addEventListener('click', function (e) {
            e.preventDefault();
            userManager.showDetailsOfThePart(part.id);
            location.hash = 'details';
          })

          let vote = document.createElement('button');
          vote.classList.add('vote');
          vote.classList.add('btn');
          vote.classList.add('btn-primary');
          if (localStorage.getItem('alreadyVotedUser')) {
            vote.innerHTML = 'Vote';
            // vote.innerHTML = 'You already vote';
            vote.setAttribute('disabled', true);
          } else {
            vote.innerHTML = 'Vote';

          vote.addEventListener('click', function (e) {
            e.preventDefault();
            userManager.voteForParty(part.id, sessionId)
          })
        }
        card.append(details, vote);
        container.append(card);
      });
    }
}

function showDetailsOfThePart(part, container) {
      container.innerHTML = "";
      let wrapper = document.createElement('div');
      wrapper.classList.add('wrapperDetails');

      let picPack = document.createElement('div');
      picPack.classList.add('cardDetails');
      let pic = document.createElement('img');
      pic.src = part.picture;
      picPack.append(pic);

      let secPack = document.createElement('div');
      secPack.classList.add('cardDetails');
      secPack.classList.add('secondPack');

      let liederNames = document.createElement('span');
      liederNames.innerHTML = part.leader;

      let text = document.createElement('p');
      text.innerHTML = part.slogan;

      let agitation = document.createElement('p');
      agitation.innerHTML = part.agitation;

      let voteForUs = document.createElement('button');
      voteForUs.classList.add('vote')
      voteForUs.classList.add('btn')
      voteForUs.classList.add('btn-primary')

      if (localStorage.getItem('alreadyVotedUser')) {
        voteForUs.innerHTML = 'Vote for us';
        // voteForUs.innerHTML = 'You already vote';
        voteForUs.setAttribute('disabled', true);
      } else {
        voteForUs.innerHTML = 'Vote for us';

        voteForUs.addEventListener('click', function (e) {
          e.preventDefault();
          userManager.voteForParty(part['_id'], sessionId)
        })
  }

      let viewResults = document.createElement('button');
      viewResults.classList.add('btn');
      viewResults.classList.add('btn-primary')
      viewResults.innerHTML = 'view results';

      viewResults.addEventListener('click', function (e) {
        e.preventDefault();
        userManager.showElectionResults(sessionId);
        location.hash = 'result';
      })

      let buttonPack = document.createElement('div');
      buttonPack.append(voteForUs, viewResults)
      secPack.append(liederNames, text, agitation, buttonPack);
      wrapper.append(picPack, secPack)
      container.append(wrapper);
}


function showResultsFromElections(arr, results, container) {
      container.innerHTML = "";
      let resultsInfo = [];

      results.map((el) => {
        let partyDetails = {};
        arr.find(e => {
          if (e.id === el.partyId) {
            partyDetails.voters = el.voters;
            partyDetails.name = e.name
          }
        });
        resultsInfo.push(partyDetails);
      })
      let totalVoters = 0;
      resultsInfo.forEach(e => totalVoters += e.voters)

      resultsInfo.sort((p1, p2) => {
        return p2.voters - p1.voters;
      })
      let electionResults = resultsInfo.map(party => {
        party.percent = Math.floor((party.voters / totalVoters) * 100);
        return party;
      })
      electionResults.forEach(party => {
        let row = document.createElement('tr');
        let nameOfParty = document.createElement('td');
        nameOfParty.innerHTML = party.name;

        let partyPercent = document.createElement('td');
        partyPercent.innerHTML = ` ${party.percent} %`;

        row.append(nameOfParty, partyPercent);
        container.append(row);
      })
}
