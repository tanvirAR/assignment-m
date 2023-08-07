import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import EngagementHelper from "./EngagementHelper";
import messageCountListInterface from "./interface/messageCountlist.interface";
import channelInterface from "./interface/channel.interface";

interface props {
  messageCountList: messageCountListInterface[];
  channels: channelInterface[];
}

const EngagementMessagesOverTime = (props: props) => {
  const { messageCountList, channels } = props;

  const options = EngagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
