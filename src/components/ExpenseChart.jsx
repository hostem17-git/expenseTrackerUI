import { ResponsivePie } from "@nivo/pie";
import { useState } from "react";
import SkeletonLoader from "./SkeletonLoader";

const ExpenseChart = ({ dataloading, data, onSliceClick, type }) => {
  if (dataloading) {
    return (
      <div className="w-full flex-1 outline text-white text-center flex items-center justify-center">
        <SkeletonLoader/> 
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full flex-1 outline text-white text-center flex items-center justify-center">
        {type === "primary" ? "No data" : "Select a primary category"}
      </div>
    );
  }

  return (
    <div
      className={`border-white/20 ${type === "primary" ? "border-b-2" : " "}`}
      style={{ height: 300 }}
    >
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set3" }}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        onClick={(slice) => onSliceClick(slice.label)} // Handle Click
        legends={[
          {
            anchor: "bottom-left",
            direction: "row",
            translateY: 60,
            translateX: -60,
            itemWidth: 120,
            itemHeight: 20,
            itemsSpacing: 5,
            symbolSize: 12,
            symbolShape: "circle",
            itemTextColor: "#555",
            onClick: (legend) => onSliceClick(legend.label),
            itemTextColor: "white",
          },
        ]}
      />
    </div>
  );
};

export default ExpenseChart;
