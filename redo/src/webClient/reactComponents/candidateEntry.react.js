type Props = $ReadOnly<{|
  candidate: Candidate,
  clicks: number,
  onClick: () => any,
|}>;

function CandidateEntry(props: Props): React.Node {
  const {candidate, clicks, onClick} = props;
  const {imgSrcLarge, name} = candidate;
  // TODO: make sure double tap on phone doesnt zoom
  return (
    <div onClick={onClick}>
      <img src={candidate.imgSrcSmall} alt={candidate.name} />
      <div>
        <h3>{candidate.name}</h3>
        <h4>{clicks}</h4>
      </div>
    </div>
  );
}

// export CandidateEntry
