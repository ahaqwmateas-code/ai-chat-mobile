import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, spacing, type Palette } from '../theme';

const SUGGESTIONS = [
  'Summarize a topic I am researching',
  'Draft a polite email asking for more time',
  'Explain a complex idea in plain language',
  'Give me three ideas for a side project',
];

interface Props {
  palette: Palette;
  onPick: (text: string) => void;
}

export default function EmptyState({ palette, onPick }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: palette.text }]}>Start a conversation</Text>
      <Text style={[styles.subtitle, { color: palette.textMuted }]}>
        Ask anything, or pick a prompt below.
      </Text>
      <View style={styles.chips}>
        {SUGGESTIONS.map((suggestion) => (
          <Pressable
            key={suggestion}
            onPress={() => onPick(suggestion)}
            accessibilityRole="button"
            style={[
              styles.chip,
              { backgroundColor: palette.surfaceAlt, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.chipText, { color: palette.text }]}>{suggestion}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: spacing.xs },
  subtitle: { fontSize: 14, marginBottom: spacing.lg, textAlign: 'center' },
  chips: { gap: spacing.sm, width: '100%' },
  chip: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  chipText: { fontSize: 14 },
});
