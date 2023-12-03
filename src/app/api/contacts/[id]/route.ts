import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { db } from '~/lib/db';

type Props = {
  params: {
    id: string;
  };
};

export async function DELETE(_req: Request, { params }: Props) {
  const { id } = params;

  await db.contact
    .delete({
      where: {
        id,
      },
    })
    .catch((e) => {
      return NextResponse.json(
        {
          ok: false,
          ...e,
        },
        {
          status: 422,
        },
      );
    });

  revalidatePath('/home');
  return NextResponse.json({
    ok: true,
  });
}
