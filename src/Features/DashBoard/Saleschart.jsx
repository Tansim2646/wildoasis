import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../Ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDarkMode from "../Context/useDarkMode";
import {
  eachDayOfInterval,
  format,
  formatDate,
  isSameDay,
  subDays,
} from "date-fns";
import { getToday } from "../../Utils/helpers";
import { isDate } from "date-fns/isDate";

const StyledSaleChart = styled(DashboardBox)`
  grid-column: 1/-1;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
function SalesChart({ bookings, numOfDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  const eachDayofTheInterval = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });
  const data = eachDayofTheInterval.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });
  return (
    <StyledSaleChart>
      <Heading as="h2">
        Sales from {formatDate(eachDayofTheInterval.at(0), "MMM dd yyyy")}
        &mdash;{formatDate(eachDayofTheInterval.at(-1), "MMM dd yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ fill: colors.text }}
          />
          <YAxis
            value="$"
            tick={{ fill: colors.text }}
            tickLine={{ fill: colors.text }}
          />
          <Tooltip contentStyle={{ background: colors.background }} />
          <CartesianGrid strokeDasharray={4} />
          <Area
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSaleChart>
  );
}
export default SalesChart;
