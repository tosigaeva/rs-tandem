export type Widget = {
  id: string;
  type: string;
  name: string;
  description: string;
};

export type TopicWidgetsResponse = {
  topic: string;
  widgets: Widget[];
};

export enum WidgetType  {
  Quiz = "quiz"
}