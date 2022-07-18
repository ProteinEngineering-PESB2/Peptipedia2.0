import Layout from "../components/layout";

import Header from "../components/home/header";
import { useHandleSection } from "../hooks/useHandleSection";
import useLoadingComponent from "../hooks/useLoadingComponent";
import StatisticsCards from "../components/home/StatisticsCards";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { Grid, Paper } from "@mui/material";

const pie_data = [
  {
    id: "c",
    label: "c",
    value: 395,
    color: "hsl(308, 70%, 50%)",
  },
  {
    id: "ruby",
    label: "ruby",
    value: 229,
    color: "hsl(158, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 305,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 535,
    color: "hsl(55, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 496,
    color: "hsl(177, 70%, 50%)",
  },
];

const data = [
  {
    country: "AD",
    "hot dog": 136,
    "hot dogColor": "hsl(43, 70%, 50%)",
    burger: 160,
    burgerColor: "hsl(291, 70%, 50%)",
    sandwich: 101,
    sandwichColor: "hsl(134, 70%, 50%)",
    kebab: 62,
    kebabColor: "hsl(216, 70%, 50%)",
    fries: 48,
    friesColor: "hsl(127, 70%, 50%)",
    donut: 145,
    donutColor: "hsl(252, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 51,
    "hot dogColor": "hsl(193, 70%, 50%)",
    burger: 14,
    burgerColor: "hsl(138, 70%, 50%)",
    sandwich: 101,
    sandwichColor: "hsl(357, 70%, 50%)",
    kebab: 35,
    kebabColor: "hsl(355, 70%, 50%)",
    fries: 150,
    friesColor: "hsl(176, 70%, 50%)",
    donut: 48,
    donutColor: "hsl(314, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 4,
    "hot dogColor": "hsl(96, 70%, 50%)",
    burger: 95,
    burgerColor: "hsl(200, 70%, 50%)",
    sandwich: 58,
    sandwichColor: "hsl(22, 70%, 50%)",
    kebab: 81,
    kebabColor: "hsl(346, 70%, 50%)",
    fries: 29,
    friesColor: "hsl(88, 70%, 50%)",
    donut: 188,
    donutColor: "hsl(243, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 5,
    "hot dogColor": "hsl(177, 70%, 50%)",
    burger: 37,
    burgerColor: "hsl(339, 70%, 50%)",
    sandwich: 114,
    sandwichColor: "hsl(128, 70%, 50%)",
    kebab: 196,
    kebabColor: "hsl(76, 70%, 50%)",
    fries: 176,
    friesColor: "hsl(254, 70%, 50%)",
    donut: 105,
    donutColor: "hsl(358, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 79,
    "hot dogColor": "hsl(83, 70%, 50%)",
    burger: 79,
    burgerColor: "hsl(32, 70%, 50%)",
    sandwich: 80,
    sandwichColor: "hsl(173, 70%, 50%)",
    kebab: 164,
    kebabColor: "hsl(232, 70%, 50%)",
    fries: 183,
    friesColor: "hsl(111, 70%, 50%)",
    donut: 143,
    donutColor: "hsl(203, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 145,
    "hot dogColor": "hsl(317, 70%, 50%)",
    burger: 51,
    burgerColor: "hsl(298, 70%, 50%)",
    sandwich: 136,
    sandwichColor: "hsl(41, 70%, 50%)",
    kebab: 32,
    kebabColor: "hsl(86, 70%, 50%)",
    fries: 181,
    friesColor: "hsl(8, 70%, 50%)",
    donut: 148,
    donutColor: "hsl(220, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 72,
    "hot dogColor": "hsl(247, 70%, 50%)",
    burger: 100,
    burgerColor: "hsl(51, 70%, 50%)",
    sandwich: 62,
    sandwichColor: "hsl(52, 70%, 50%)",
    kebab: 172,
    kebabColor: "hsl(97, 70%, 50%)",
    fries: 41,
    friesColor: "hsl(345, 70%, 50%)",
    donut: 22,
    donutColor: "hsl(330, 70%, 50%)",
  },
];

const line_data = [
  {
    id: "japan",
    color: "hsl(138, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 273,
      },
      {
        x: "helicopter",
        y: 96,
      },
      {
        x: "boat",
        y: 276,
      },
      {
        x: "train",
        y: 143,
      },
      {
        x: "subway",
        y: 112,
      },
      {
        x: "bus",
        y: 256,
      },
      {
        x: "car",
        y: 11,
      },
      {
        x: "moto",
        y: 48,
      },
      {
        x: "bicycle",
        y: 246,
      },
      {
        x: "horse",
        y: 99,
      },
      {
        x: "skateboard",
        y: 297,
      },
      {
        x: "others",
        y: 156,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(124, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 284,
      },
      {
        x: "helicopter",
        y: 51,
      },
      {
        x: "boat",
        y: 25,
      },
      {
        x: "train",
        y: 151,
      },
      {
        x: "subway",
        y: 37,
      },
      {
        x: "bus",
        y: 165,
      },
      {
        x: "car",
        y: 296,
      },
      {
        x: "moto",
        y: 209,
      },
      {
        x: "bicycle",
        y: 144,
      },
      {
        x: "horse",
        y: 77,
      },
      {
        x: "skateboard",
        y: 20,
      },
      {
        x: "others",
        y: 156,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(39, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 88,
      },
      {
        x: "helicopter",
        y: 18,
      },
      {
        x: "boat",
        y: 165,
      },
      {
        x: "train",
        y: 288,
      },
      {
        x: "subway",
        y: 138,
      },
      {
        x: "bus",
        y: 113,
      },
      {
        x: "car",
        y: 93,
      },
      {
        x: "moto",
        y: 292,
      },
      {
        x: "bicycle",
        y: 129,
      },
      {
        x: "horse",
        y: 288,
      },
      {
        x: "skateboard",
        y: 123,
      },
      {
        x: "others",
        y: 250,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(70, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 159,
      },
      {
        x: "helicopter",
        y: 294,
      },
      {
        x: "boat",
        y: 36,
      },
      {
        x: "train",
        y: 79,
      },
      {
        x: "subway",
        y: 36,
      },
      {
        x: "bus",
        y: 178,
      },
      {
        x: "car",
        y: 274,
      },
      {
        x: "moto",
        y: 105,
      },
      {
        x: "bicycle",
        y: 135,
      },
      {
        x: "horse",
        y: 90,
      },
      {
        x: "skateboard",
        y: 88,
      },
      {
        x: "others",
        y: 23,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(59, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 193,
      },
      {
        x: "helicopter",
        y: 92,
      },
      {
        x: "boat",
        y: 47,
      },
      {
        x: "train",
        y: 268,
      },
      {
        x: "subway",
        y: 161,
      },
      {
        x: "bus",
        y: 285,
      },
      {
        x: "car",
        y: 41,
      },
      {
        x: "moto",
        y: 184,
      },
      {
        x: "bicycle",
        y: 111,
      },
      {
        x: "horse",
        y: 21,
      },
      {
        x: "skateboard",
        y: 236,
      },
      {
        x: "others",
        y: 137,
      },
    ],
  },
];

const MyResponsivePie = ({ data }: any) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

const MyResponsiveBar = ({ data }: any) => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
    groupMode="grouped"
  />
);

export default function Home() {
  useHandleSection({ section: "home" });
  useLoadingComponent();

  return (
    <Layout>
      <>
        <Header />

        <StatisticsCards />

        <Grid container spacing={2} marginTop={2}>
          <Grid item xl={8}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                height: 600,
                boxShadow: 5,
              }}
            >
              <MyResponsiveBar data={data} />
            </Paper>
          </Grid>
          <Grid item xl={4}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                height: 600,
                boxShadow: 5,
              }}
            >
              <MyResponsivePie data={pie_data} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} marginTop={2}>
          <Grid item xl={12}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                height: 600,
                boxShadow: 5,
              }}
            >
              <ResponsiveLine
                data={line_data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "transportation",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "count",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </>
    </Layout>
  );
}
