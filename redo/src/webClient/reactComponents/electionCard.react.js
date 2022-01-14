type Props = $ReadOnly<{|
  year: number,
  candidateEntries: $ReadOnlyArray<{candidate: Candidate, clicks: number}>,
|}>;

function ElectionCard(props: Props): React.Node {
  // TODO: dont copy if dont need to
  const candidateEntries = Array.from(props.candidateEntries);
  candidateEntries.sort((a, b) => a.clicks - b.clicks);
  const candidateNames = candidateEntries
    .map(can => `${can.name} (${can.clicks})`)
    .join(', ');
  const leadingCandidate = firstx(candidateEntries[0]);
  return (
    <div>
      <img src={leadingCandidate.imgSrcSmall} alt={leadingCandidate.name} />
      <div>
        <h3>{year}</h3>
        <h4>{candidateNames}</h4>
      </div>
    </div>
  );
}

// export ElectionCard
