import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { radius, spacing, type Palette } from '../theme';

interface Props {
  palette: Palette;
  disabled: boolean;
  onSend: (text: string) => void;
}

export default function Composer({ palette, disabled, onSend }: Props) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !disabled;

  function submit() {
    const trimmed = text.trim();
    if (trimmed.length === 0 || disabled) {
      return;
    }
    onSend(trimmed);
    setText('');
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette.surface, borderTopColor: palette.border },
      ]}
    >
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Message…"
        placeholderTextColor={palette.textMuted}
        multiline
        maxLength={4000}
        style={[
          styles.input,
          {
            backgroundColor: palette.surfaceAlt,
            color: palette.text,
            borderColor: palette.border,
          },
        ]}
      />
      <Pressable
        onPress={submit}
        disabled={!canSend}
        accessibilityRole="button"
        accessibilityLabel="Send message"
        style={[
          styles.button,
          { backgroundColor: canSend ? palette.accent : palette.surfaceAlt },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: canSend ? palette.accentContrast : palette.textMuted },
          ]}
        >
          {disabled ? '…' : 'Send'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  input: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    fontSize: 15,
    maxHeight: 120,
    minHeight: 42,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  button: {
    alignItems: 'center',
    borderRadius: radius.md,
    height: 42,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonText: { fontSize: 15, fontWeight: '600' },
});
