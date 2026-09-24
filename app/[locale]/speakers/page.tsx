import { PageHeading } from "@/components/atoms/page-heading";
import { Flex } from "@chakra-ui/react";

export default function SpeakersPage() {
  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title="Speakers">
        Who is speaking at React Alicante, and when.
      </PageHeading>
    </Flex>
  );
}
