export interface ReportsModel {
  count: number;
  next: string;
  previous: string;
  results: ReportModel[];
}

export interface ReportModel {
  created_at: string | Date;
  file: string;
  id: string;
  is_public: boolean;
  title: string;
  description: string;
  location: string;
}

export const parseReports = (reports: ReportModel[]) => {
  return reports.map(item => {
    const date = new Date(item.created_at);
    return {
      ...item,
      created_at: `${formatMonth(date.getDate())}/${formatMonth(date.getMonth() + 1)}/${date.getFullYear()}`,
      location: 'São Paulo',
      description: `    Lorem ipsum dolor sit amet, 07.721.973/0001-69 consectetur adipiscing elit. Duis semper diam in euismod scelerisque. In consectetur facilisis lectus ut tristique. Nunc placerat tincidunt mauris id posuere. Donec non ligula ut ligula consequat consequat. Aliquam fringilla metus ut eros tempor, sed vehicula nunc auctor. Morbi aliquam ullamcorper arcu, vitae faucibus ante posuere vel. Fusce sed eros ac arcu pulvinar fringilla. Proin fermentum faucibus pretium. Ut a ex volutpat, sollicitudin nulla at, efficitur nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed nunc mi, pharetra quis felis ac, ultricies rhoncus lectus.
      
      Nunc elit lacus, sodales a ullamcorper nec, vulputate id justo. Integer nunc diam, posuere at urna at, blandit vulputate libero. Morbi urna diam, elementum eu neque nec, sodales porta ex. Sed egestas lorem tempus neque auctor, a fermentum mi congue. Praesent vel eleifend est. Suspendisse pretium nisl nunc, vel pretium velit congue sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse commodo malesuada nulla id efficitur. Cras vel varius nisi. Mauris blandit varius nulla ut fringilla. In et quam blandit, suscipit enim eget, pellentesque sapien. Sed orci ligula, ullamcorper a orci non, vulputate sollicitudin turpis.
      
      Donec finibus placerat neque, id tempor ex hendrerit at. Etiam vel urna finibus nisi varius malesuada. Nam ut felis feugiat, feugiat ipsum id, pretium nulla. Sed eu fermentum lacus, et lobortis urna. Etiam ornare faucibus erat ac volutpat. Nulla arcu erat, congue in ex ac, posuere auctor augue. Quisque et bibendum velit, in ullamcorper lorem. Aenean ullamcorper diam id volutpat pharetra. Ut et est vel arcu suscipit ultrices vitae non massa. In scelerisque erat id condimentum hendrerit. Ut vitae quam metus. Sed vestibulum semper lacus in accumsan. Curabitur at feugiat nisl. Sed rhoncus lorem sed tellus rutrum, vel commodo purus elementum. Phasellus eget.`,
    }
  });
}

const formatMonth = (number: number) => {
  return number < 10 ? `0${number}` : number;
}