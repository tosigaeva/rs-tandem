import { NextRequest, NextResponse } from 'next/server';

import { TopicService } from '@/services/topic.service';

export async function GET(request: NextRequest) {
  const page = Number.parseInt(request.nextUrl.searchParams.get('page') ?? '1', 10);
  const rawSkipIds = request.nextUrl.searchParams.get('skipIds') ?? '';
  const skipIds = rawSkipIds
    .split(',')
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => !Number.isNaN(value));

  const { data, error } = await TopicService.loadTopicsPage(skipIds, {
    page: Number.isNaN(page) || page < 1 ? 1 : page,
    size: 1,
    orderBy: 'created_at',
    ascending: true,
  });

  if (error != undefined || data == undefined) {
    return NextResponse.json({ error: error ?? 'Failed to load topics' }, { status: 500 });
  }

  return NextResponse.json({
    items: data.items,
    page: data.page,
    totalPages: data.totalPages,
  });
}
