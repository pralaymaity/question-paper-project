## Question Storage Format:
- The `question` column stores multiple questions in a single row.
- Each question is separated by `\n` (newline).
- To retrieve all questions properly, use:
  SELECT replace(question, E'\n', ' [NEWLINE] ') FROM QuestionStorages;
