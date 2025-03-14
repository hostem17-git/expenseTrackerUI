import { ResponsivePie } from "@nivo/pie";

const ExpenseChart = ({ data, onSliceClick }) => {
    if(!data){
        return <div>No data</div>
    }

  return (
    <div style={{ height:300 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8} 
        colors={{ scheme: "category10" }}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        onClick={(slice) => onSliceClick(slice)} // Handle Click
      />
    </div>
  );
};

export default ExpenseChart;
