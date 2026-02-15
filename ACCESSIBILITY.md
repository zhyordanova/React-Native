# Accessibility Guide

This document describes the accessibility features implemented in the ExpenseTracker app to ensure it's usable by people with disabilities.

## Overview

ExpenseTracker is designed with accessibility in mind, following React Native and mobile app accessibility best practices.

## Features

### Screen Reader Support

✅ **All Interactive Elements Have Labels**
- Buttons: `accessibilityLabel` set to button text
- Icon buttons: Descriptive labels (e.g., "Add new expense", "Logout")
- Form inputs: Labels linked to fields via `accessibilityLabel`
- Expense items: Descriptive label with amount and date

✅ **Accessibility Roles**
- All `Pressable` components have `accessibilityRole="button"`
- Screen readers announce them as buttons, not just generic pressables

### Form Accessibility

✅ **Input Labels & Hints**
- Each input has an `accessibilityLabel` matching the visible label
- Error messages provided as `accessibilityHint`
- Screen readers announce errors when present

**Example:**
```javascript
<TextInput
  accessibilityLabel="Email address"
  accessibilityHint="Required field, must be valid email"
  {...otherProps}
/>
```

### Password Visibility Toggle

✅ **Eye Icon Accessibility**
- Dynamic `accessibilityLabel`: "Show password" / "Hide password"
- `accessibilityHint`: "Toggle password visibility"
- `accessibilityRole`: "button"

Screen readers announce: "Show password, button, toggle password visibility"

### Expense Item Accessibility

✅ **Rich Item Context**
- Label: "{description} expense"
- Hint: "${amount} on {date}"

**Example:**
"Grocery expense, button, $45.50 on Feb 5, 2025"

## Testing with Screen Readers

### iOS (VoiceOver)

Enable: Settings → Accessibility → VoiceOver

Gestures:
- Single tap: Select element
- Double tap: Activate button
- Swipe right: Next element
- Swipe left: Previous element

### Android (TalkBack)

Enable: Settings → Accessibility → TalkBack

Gestures:
- Single tap: Explore by touch
- Double tap: Activate
- Swipe right: Next element
- Swipe left: Previous element

## Implementation Details

### Components with Accessibility

#### UI Components

**Input.js**
```javascript
<TextInput
  accessibilityLabel={label}
  accessibilityHint={errorText || ""}
/>

{isPasswordField && (
  <Pressable
    accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
    accessibilityHint="Toggle password visibility"
    accessibilityRole="button"
  >
    {/* Eye icon */}
  </Pressable>
)}
```

**Button.js**
```javascript
<Pressable
  accessibilityRole="button"
  accessibilityLabel={children}
/>
```

**IconButton.js**
```javascript
<Pressable
  accessibilityLabel={accessibilityLabel}
  accessibilityRole="button"
/>
```

#### Screen Components

**ExpenseItem.js**
```javascript
<Pressable
  accessibilityRole="button"
  accessibilityLabel={`${description} expense`}
  accessibilityHint={`$${amount.toFixed(2)} on ${getFormattedDate(date)}`}
/>
```

### Navigation Accessibility

**App.js Header Buttons**
```javascript
<IconButton
  icon="add"
  accessibilityLabel="Add new expense"
  onPress={...}
/>

<IconButton
  icon="exit"
  accessibilityLabel="Logout"
  onPress={...}
/>
```

## Best Practices Followed

✅ **Meaningful Labels**
- All labels describe the purpose or content
- Not cryptic or technical
- Suitable for screen reader users

✅ **Sufficient Contrast**
- Text contrast ratio meets WCAG AA standards
- Primary colors have good contrast with backgrounds

✅ **Touch Target Size**
- Icon buttons: 24dp with 6dp padding = 36dp touch target
- Buttons: 44dp minimum height (accessibility standard)

✅ **Error Handling**
- Errors announced via `accessibilityHint`
- Not relying on color alone to communicate errors

✅ **No Color-Only Information**
- Password visibility uses icon change + label change
- Error states include text, not just red background

## Future Improvements

- [ ] Add `maxFontSizeMultiplier` for typography accessibility
- [ ] Implement `accessibilityActions` for custom gestures
- [ ] Add focus indicators for keyboard navigation
- [ ] Test with actual screen reader users
- [ ] Add captions/transcripts if audio is added
- [ ] Implement high contrast theme option

## Testing Checklist

Before release, test with:
- [ ] VoiceOver on iOS
- [ ] TalkBack on Android
- [ ] Keyboard-only navigation
- [ ] Screen reader at different speech rates
- [ ] Text magnification (up to 200%)
- [ ] High contrast mode

## Resources

- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Apple Accessibility](https://www.apple.com/accessibility/)
- [Google Android Accessibility](https://www.google.com/accessibility/)

## Questions?

For accessibility issues or suggestions, please review this guide and the React Native documentation. Consider testing with actual assistive technology users for best results.
