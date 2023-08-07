import channelInterface from "./interface/channel.interface";
import messageCountListInterface from "./interface/messageCountlist.interface";

class EngagementHelper {
  static engagementMessageOverTimeChartOptions(
    messageCountList: messageCountListInterface[],
    channels: channelInterface[]
  ) {
    const channelData: channelDataInterface = {};

    /**  Organize messageCountList data by channelId and date as the form of interface @channelDataInterface */
    messageCountList.forEach((item) => {
      const { count, timeBucket, channelId } = item;
      if (!channelData[channelId]) {
        channelData[channelId] = {};
      }
      const date = new Date(timeBucket).getTime();
      channelData[channelId][date] = count;
    });

    /** Filter channels with messages more than 1 date */

    /**  Set is used so that duplicate is not added (@unique @Id only) */
    const relevantChannelIds = new Set();

    messageCountList.forEach((item) => {
      const { channelId } = item;
      relevantChannelIds.add(channelId);
    });

    const relevantChannels = channels.filter((channel) => {
      return (
        relevantChannelIds.has(channel.value) &&
        channelData[channel.value] &&
        Object.keys(channelData[channel.value]).length > 1
      );
    });

    /** Prepare the final @seriesData for HighCharts */
    const seriesData = relevantChannels.map((channel) => {
      const channelId = channel.value;
      const data = [];

      for (const dateStr in channelData[channelId]) {
        const date = parseInt(dateStr);
        const count = parseInt(channelData[channelId][dateStr]);
        data.push([date, count]);
      }

      return { name: "message", data, type: "spline" };
    });

    const options = {
      chart: {
        type: "line",
        backgroundColor: "transparent",
        height: "47%",
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
      title: {
        text: "Messages Over Time",
        style: {
          color: "white",
        },
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
        gridLineWidth: 0,
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
        gridLineWidth: 0,
      },

      tooltip: {
        shared: true,
        crosshairs: true,
        positioner: function (
          labelWidth: number,
          labelHeight: number,
          point: any
        ): Highcharts.PositionObject {
          /** @adjusting the toolbar position */
          const x = Math.max(
            0,
            Math.min(
              point.plotX + this.chart.plotLeft - labelWidth / 2,
              this.chart.plotWidth - labelWidth
            )
          );
          const y = point.plotY + this.chart.plotTop - labelHeight - 10;
          return { x, y };
        },
      },
      series: seriesData,
    };

    return options;
  }
}

interface channelDataInterface {
  [channelId: string]: {
    [date: string]: string;
  };
}

/** @exmaple of channelData: 
  {
  "channelId1": {
    "2023-08-01": "10",   
    "2023-08-02": "15",
  },
  */

export default EngagementHelper;
