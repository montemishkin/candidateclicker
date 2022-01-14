type Props = $ReadOnly<{||}>;

function App(props: Props): React.Node {
  const [state, setState] = useState(null);
  function pullLatestState() {
    // fetch
    // then setState
  }
  useInterval(pullLatestState);
  return (
    <>
      <Nav />
      <Switch>
        <Route />
        <Route />
      </Switch>
      <Footer />
    </>
  );
}

// export App
