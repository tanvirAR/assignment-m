import EngagementMessagesOverTime from "./EngagementMessagesOverTime";
import classes from "./App.module.css"
import messageCountListData from "./data/data";
import channelsData from "./data/data2";

function App() {
  return (
    <div className={classes.main}>
      <EngagementMessagesOverTime
        messageCountList={messageCountListData}
        channels={channelsData}
      />
    </div>
  );
}

export default App;
