import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, ShoppingBag, TrendingUp, Wallet } from 'lucide-react-native';
import { MetricCard } from '@/components/MetricCard';
import { SalesChart } from '@/components/SalesChart';
import { mockSalesData, useSalesData } from '@/mocks/salesData';
import { darkTheme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const data = useSalesData();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0A0E27', '#151A35', '#0A0E27']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Dashboard</Text>
            <Text style={styles.subtitle}>Panel de Control Financiero</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>En vivo</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={darkTheme.primary}
            />
          }
        >
          <View style={styles.mainCardContainer}>
            <MetricCard
              title="Balance Total"
                    value={`€${data.totalBalance}`}
              icon={Wallet}
              iconColor={darkTheme.primary}
              subtitle="Capital principal"
              isLarge
            />
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <MetricCard
                title="Nº Pedidos"
                value={data.totalOrders.toString()}
                icon={ShoppingBag}
                iconColor={darkTheme.secondary}
                subtitle="Total acumulado"
              />
            </View>
            
            
            <View style={styles.metricItem}>
              <MetricCard
                title="Ventas Hoy"
                value={data.todaySales.toString()}
                icon={TrendingUp}
                iconColor={darkTheme.success}
                subtitle={new Date().toLocaleDateString('es-ES')}
              />
            </View>
          </View>
 <View style={styles.fullWidthCard}>
            <MetricCard
                title="Gastos Totales"
                value={`€${data.totalExpenses}`}
                icon={DollarSign}
                iconColor={darkTheme.error}
                subtitle="Costes acumulados"
            />
            </View>
          <View style={styles.fullWidthCard}>
            <MetricCard
              title="Facturado"
              value={formatCurrency(data.todayRevenue)}
              icon={DollarSign}
              iconColor={darkTheme.warning}
              subtitle={`${data.todaySales} transacciones`}
            />
          </View>
           

          <View style={styles.chartSection}>
            <SalesChart data={data.dailyData} type="sales" />
          </View>

          <View style={styles.chartSection}>
            <SalesChart data={data.dailyData} type="revenue" />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Última actualización: {new Date().toLocaleTimeString('es-ES')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: darkTheme.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: darkTheme.textSecondary,
    fontWeight: '500' as const,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: darkTheme.success,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    color: darkTheme.text,
    fontWeight: '600' as const,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  mainCardContainer: {
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
  },
  fullWidthCard: {
    marginBottom: 20,
  },
  chartSection: {
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: darkTheme.textSecondary,
  },
});
