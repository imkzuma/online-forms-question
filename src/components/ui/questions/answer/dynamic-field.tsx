import type { FieldProps } from "./answer.types";
import { ShortAnswerField } from "./fields/short-answer";
import { ParagraphField } from "./fields/paragraph";
import { DateField } from "./fields/date";
import { MultipleChoiceField } from "./fields/multiple-choice";
import { CheckboxField } from "./fields/checkbox";
import { DropdownField } from "./fields/dropdown";

const parseChoices = (choices: string | string[] | undefined): string[] => {
  return typeof choices === "string" ? choices.split(", ") : choices || [];
};

export const FieldRenderer: React.FC<FieldProps> = ({
  question,
  index,
  register,
  control,
  setValue,
  watch,
}) => {
  const choices = parseChoices(question.choices);

  switch (question.choice_type) {
    case "short answer":
      return <ShortAnswerField register={register} index={index} />;

    case "paragraph":
      return <ParagraphField register={register} index={index} />;

    case "date":
      return <DateField register={register} index={index} />;

    case "multiple choice":
      return (
        <MultipleChoiceField
          control={control}
          index={index}
          choices={choices}
        />
      );

    case "checkboxes":
      return (
        <CheckboxField
          setValue={setValue}
          watch={watch}
          index={index}
          choices={choices}
        />
      );

    case "dropdown":
      return (
        <DropdownField
          register={register}
          watch={watch}
          index={index}
          choices={choices}
        />
      );

    default:
      console.warn(`Unknown choice type: `);
      return null;
  }
};
