import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid, Text } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title="Speakers">
        Who is speaking at React Alicante, and when.
      </PageHeading>

      {speakers.length === 0 ? (
        <Text color="var(--text-muted)">No speakers announced yet.</Text>
      ) : (
        <Grid
          as="ul"
          gap="4"
          padding="0"
          listStyle="none"
          templateColumns={{
            base: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          }}
        >
          {speakers.map(({ name, sessions: speakerSessions }) => (
            <SpeakerCard key={name} name={name} sessions={speakerSessions} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}
