import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  name: string;
  sessions: Pick<Session, "id" | "title" | "startTime">[];
}

export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card as="li" height="full" minWidth="0">
      <CardHeader>
        <CardTitle as="h2">{name}</CardTitle>
      </CardHeader>

      <CardContent>
        <Flex as="ul" role="list" direction="column" gap="3" listStyle="none">
          {sessions.map(({ id, title, startTime }) => (
            <li key={id}>
              <ChakraLink
                asChild
                display="flex"
                flexDirection="column"
                alignItems="stretch"
                gap="0.5"
                color="var(--text-primary)"
                borderRadius="sm"
                _hover={{ textDecoration: "underline" }}
                _focusVisible={{
                  textDecoration: "underline",
                  outline: "2px solid var(--accent-hex)",
                  outlineOffset: "2px",
                }}
              >
                <Link href={`/sessions/${id}`}>
                  <Text fontSize="sm" color="var(--text-secondary)">
                    {startTime}
                  </Text>
                  <Text fontSize="sm" color="var(--text-primary)">
                    {title}
                  </Text>
                </Link>
              </ChakraLink>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
