import { ResponsivePie } from "@nivo/pie";

const ExpenseChart = ({ data, onSliceClick ,type}) => {
    if(!data){
        if(type === "primary")
          return <div className="w-full flex-1 outline border-b-2 border-white/10 text-white text-center flex items-center justify-center">No data</div>
        else{
          return <div className="w-full flex-1 outline text-white text-center flex items-center justify-center">Select a primary category</div>
        }
    }

  return (
    <div className="border-b-2 border-white/20" style={{ height:300}}>
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
        onClick={(slice) => onSliceClick(slice)} // Handle Click
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'row',
            translateY: 60,
            translateX:-60,
            itemWidth: 120,
            itemHeight: 20,
            itemsSpacing: 5,
            symbolSize: 12,
            symbolShape: 'circle',
            itemTextColor: '#555',
            onClick:(legend)=>onSliceClick(legend),
            itemTextColor:"white",
  
          },
        ]}
      />
    </div>
  );
};

export default ExpenseChart;
