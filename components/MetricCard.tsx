import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { darkTheme } from '@/constants/theme';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  subtitle?: string;
  isLarge?: boolean;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  subtitle,
  isLarge = false 
}: MetricCardProps) {
  return (
    <View style={[styles.card, isLarge && styles.cardLarge]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Icon size={isLarge ? 28 : 20} color={iconColor} />
        </View>
      </View>
      <Text style={[styles.value, isLarge && styles.valueLarge]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: darkTheme.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  cardLarge: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    color: darkTheme.textSecondary,
    fontWeight: '500' as const,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: darkTheme.text,
    marginBottom: 4,
  },
  valueLarge: {
    fontSize: 42,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: darkTheme.textSecondary,
  },
});
