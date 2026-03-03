type PageProperties = {
  params: Promise<{ widgetId: string }>;
};

export default async function Page({ params }: PageProperties) {
  const { widgetId } = await params;

  return <main>{widgetId}</main>;
}
