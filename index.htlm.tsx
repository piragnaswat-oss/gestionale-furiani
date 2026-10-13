import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";

import { useAuth } from "@/src/auth-context";
import { colors, spacing, radius } from "@/src/theme";
import { useRouter } from "expo-router";

const BG =
  "https://images.pexels.com/photos/6566976/pexels-photo-6566976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, status, error } = useAuth();
  const router = useRouter();
  const busy = status === "loading";

  return (
    <View style={styles.root} testID="login-screen">
      <Image source={{ uri: BG }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
      <LinearGradient
        colors={["rgba(16,18,16,0.5)", "rgba(16,18,16,0.9)", "#101210"]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.top, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>BATTAGLIONE FURIANI · 630 ROCS</Text>
        </View>
      </View>

      <View style={styles.logoWrap}>
        <Image
          source={require("../assets/images/furiani-logo.jpeg")}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + spacing.xxl }]}>
        <Text style={styles.title}>FURIANI</Text>
        <Text style={styles.titleSub}>GESTIONALE</Text>
        <Text style={styles.subtitle}>
          Comando operativo del Battaglione. Accedi per gestire roster, presenze, tesseramento e documentazione.
        </Text>

        {error ? (
          <Text style={styles.error} testID="login-error">
            {error}
          </Text>
        ) : null}

        <Pressable
          testID="google-login-button"
          onPress={signIn}
          disabled={busy}
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.85 },
            busy && { opacity: 0.6 },
          ]}
        >
          {busy ? (
            <ActivityIndicator color={colors.onSurface} />
          ) : (
            <>
              <Ionicons name="logo-google" size={20} color={colors.onSurface} />
              <Text style={styles.buttonText}>ACCEDI CON GOOGLE</Text>
            </>
          )}
        </Pressable>

        <Text style={styles.footer}>Autenticazione sicura · Sessione 7 giorni</Text>

        <Pressable
          testID="vetrina-link"
          onPress={() => router.push("/vetrina")}
          style={({ pressed }) => [styles.vetrinaLink, pressed && { opacity: 0.7 }]}
          hitSlop={6}
        >
          <Ionicons name="eye-outline" size={14} color={colors.brandPrimary} />
          <Text style={styles.vetrinaLinkText}>VISITA LA VETRINA PUBBLICA</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  top: {
    paddingHorizontal: spacing.lg,
    alignItems: "flex-start",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "rgba(16,18,16,0.7)",
    borderColor: colors.borderStrong,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brandPrimary,
  },
  badgeText: {
    color: colors.onSurface,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "700",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  logo: {
    width: 220,
    height: 220,
  },
  bottom: {
    marginTop: "auto",
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    color: colors.onSurface,
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 3,
    lineHeight: 50,
  },
  titleSub: {
    color: colors.brandPrimary,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 6,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.onSurfaceSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  button: {
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.borderStrong,
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  buttonText: {
    color: colors.onSurface,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
  },
  footer: {
    color: colors.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
  vetrinaLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.brandPrimary,
    alignSelf: "center",
  },
  vetrinaLinkText: {
    color: colors.brandPrimary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
});
