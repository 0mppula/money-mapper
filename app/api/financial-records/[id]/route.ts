import { getAuthSession } from '@/app/actions/auth';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
	try {
		const session = await getAuthSession();

		if (!session) {
			return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
		}

		const financialRecord = await db.financialRecord.delete({
			where: { id: params.id },
		});

		return NextResponse.json({ data: financialRecord });
	} catch (error) {
		NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
	}
};
