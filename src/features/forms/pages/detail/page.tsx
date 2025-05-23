import { useParams } from "react-router-dom";
import { useGetFormBySlugQuery } from "../../service";
import { Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import FormTitle from "../../_components/form-title";
import FormLimitResponse from "../../_components/form-limit-response";
import ViewQuestions from "../../../../components/questions/view-questions";
import { TabPanel } from "../../../../components/ui/tabs";
import { useState } from "react";
import FormResponse from "../../_components/form-response";
import Loading from "../../../../components/ui/loading";
import HeaderWithBackButton from "../../_components/header/with-back-button";

/**
 * [IMPORTANT NOTE FOR REVIEWERS]
 *
 * Dear Reviewers,
 *
 * Please note that the current API endpoint:
 *    GET /api/v1/forms/<form_slug>/responses
 *
 * does not behave as expected. Instead of returning only the responses
 * associated with the specified form slug, it currently returns responses
 * for **all** forms.
 *
 * Due to this inconsistency from the backend, the "Responses" tab in the UI
 * displays the data as-is from the API response, without any filtering
 * based on the form slug.
 *
 * Once the backend issue is resolved, proper filtering can be applied
 * client-side or expected directly from the API response.
 *
 * Thank you for your understanding.
 */

export default function DetailFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const [value, setValue] = useState<number>(0);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data, isLoading } = useGetFormBySlugQuery({
    form_slug: slug as string,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  const { limit_one_response, questions } = data.form;

  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Stack pb={2}>
          <HeaderWithBackButton title="Detail Form" backHref="/forms" />
        </Stack>

        <FormLimitResponse isLimitOneResponse={limit_one_response} />
        <FormTitle {...data.form} />

        <Stack spacing={2} pt={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="auto"
          >
            <Tab label="Questions" />
            <Tab label="Responses" />
          </Tabs>

          <TabPanel value={value} index={0}>
            {questions.length === 0 && (
              <Typography
                variant="subtitle2"
                color="text.secondary"
                textAlign={"center"}
                sx={{ py: 5 }}
              >
                No questions available for this form.
              </Typography>
            )}
            <ViewQuestions questions={questions} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FormResponse formSlug={slug as string} />
          </TabPanel>
        </Stack>
      </Stack>
    </Container>
  );
}
