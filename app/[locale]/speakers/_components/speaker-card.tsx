import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

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
        <Flex as="ul" direction="column" gap="3" listStyle="none">
          {sessions.map(({ id, title, startTime }) => (
            <li key={id}>
              <Link href={`/sessions/${id}`}>
                <Flex
                  direction="column"
                  gap="0.5"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text fontSize="sm" color="var(--text-muted)">
                    {startTime}
                  </Text>
                  <Text fontSize="sm" color="var(--text-primary)">
                    {title}
                  </Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
