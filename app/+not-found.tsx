import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AlertCircle } from "lucide-react-native";
import { darkTheme } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Error 404" }} />
      <View style={styles.container}>
        <AlertCircle size={64} color={darkTheme.error} />
        <Text style={styles.title}>Página no encontrada</Text>
        <Text style={styles.subtitle}>Esta pantalla no existe</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al Dashboard</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: darkTheme.background,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: darkTheme.text,
  },
  subtitle: {
    fontSize: 16,
    color: darkTheme.textSecondary,
  },
  link: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: darkTheme.primary,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: darkTheme.background,
  },
});
