import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { DailySales } from '@/mocks/salesData';
import { darkTheme } from '@/constants/theme';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';

interface SalesChartProps {
  data: DailySales[];
  type: 'sales' | 'revenue';
}

const CHART_WIDTH = Dimensions.get('window').width - 64;
const CHART_HEIGHT = 200;
const PADDING = { top: 20, bottom: 30, left: 10, right: 10 };

export function SalesChart({ data, type }: SalesChartProps) {
  const values = data.map(d => type === 'sales' ? d.sales : d.revenue);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const valueRange = maxValue - minValue;

  const chartWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const chartHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const getX = (index: number) => {
    return PADDING.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    const normalized = (value - minValue) / (valueRange || 1);
    return CHART_HEIGHT - PADDING.bottom - normalized * chartHeight;
  };

  const pathData = data.map((d, i) => {
    const value = type === 'sales' ? d.sales : d.revenue;
    const x = getX(i);
    const y = getY(value);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const gradientPath = `${pathData} L ${getX(data.length - 1)} ${CHART_HEIGHT - PADDING.bottom} L ${getX(0)} ${CHART_HEIGHT - PADDING.bottom} Z`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'sales' ? 'Ventas por Día' : 'Ingresos por Día'}
      </Text>
      <View style={styles.chartContainer}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <Path
            d={gradientPath}
            fill={type === 'sales' ? darkTheme.chart.gradient1 : darkTheme.chart.gradient2}
          />
          <Path
            d={pathData}
            stroke={type === 'sales' ? darkTheme.chart.line1 : darkTheme.chart.line2}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => {
            const value = type === 'sales' ? d.sales : d.revenue;
            const x = getX(i);
            const y = getY(value);
            return (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill={type === 'sales' ? darkTheme.chart.line1 : darkTheme.chart.line2}
              />
            );
          })}
          <Line
            x1={PADDING.left}
            y1={CHART_HEIGHT - PADDING.bottom}
            x2={CHART_WIDTH - PADDING.right}
            y2={CHART_HEIGHT - PADDING.bottom}
            stroke={darkTheme.border}
            strokeWidth={1}
          />
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <SvgText
                key={i}
                x={x}
                y={CHART_HEIGHT - 10}
                fill={darkTheme.textSecondary}
                fontSize={10}
                textAnchor="middle"
              >
                {d.date}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: darkTheme.text,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
});
