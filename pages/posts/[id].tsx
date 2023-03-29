import { google, sheets_v4 } from 'googleapis';
import React from 'react';

export async function getServerSideProps({
  query,
}): Promise<{ props: { title: string; content: string } }> {
  //Auth
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const { id } = query;
  const range = `Sheet2!A${id}:C${id}`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID as string,
    range,
  });

  const [title, content] = response.data.values[0];
  console.log(title, content);

  return {
    props: {
      title,
      content,
    },
  };
}

interface PostProps {
  title: string;
  content: any;
}

export default function Post({ title, content }: PostProps): any {
  return (
    <article>
      <h1>{title}</h1>
      <div>{content}</div>
    </article>
  );
}
