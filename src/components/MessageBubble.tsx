import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ChatMessage } from '../types';
import { radius, spacing, type Palette } from '../theme';

interface Props {
  message: ChatMessage;
  palette: Palette;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function MessageBubble({ message, palette }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isUser ? palette.userBubble : palette.assistantBubble,
            borderColor: palette.border,
          },
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}
      >
        <Text style={[styles.role, { color: palette.textMuted }]}>
          {isUser ? 'You' : 'Assistant'}
        </Text>
        <Text selectable style={[styles.content, { color: palette.text }]}>
          {message.content}
        </Text>
        <Text style={[styles.time, { color: palette.textMuted }]}>
          {formatTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  rowUser: { justifyContent: 'flex-end' },
  rowAssistant: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '85%',
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleUser: { borderTopRightRadius: radius.sm },
  bubbleAssistant: { borderTopLeftRadius: radius.sm },
  role: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  content: { fontSize: 15, lineHeight: 21 },
  time: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
});
