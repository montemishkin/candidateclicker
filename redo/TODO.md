- old todos
- kubernetes?
- tls
- maybe just use some aws magic for the db?
- candidate profiles?
- bake votes into static data upon election
- catch error at root of react app and display page that asks them to refresh (or auto-refreshes to self? can you do that?)
- probably want to just go ahead and add redux so you can do fancy clicker game stuff one day if you want

# Schema

Candidate

- id
- name
- imgSrcSmall
- imgSrcLarge

Election

- id
- year

CandidateEntry

- electionID
- candidateID
- clicks
