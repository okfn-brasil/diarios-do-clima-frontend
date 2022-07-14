import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserState } from '@app/models/user.model';
import { RootState } from '@app/stores/store';
import { urls } from '@app/ui/utils/urls';

interface PropsLinkManager {
  children: JSX.Element;
  to: string;
}

interface ConditionModel {
  url: string;
  condition: (x: UserState) => boolean;
  newUrl: string;
}

const conditions: ConditionModel[] = [
  {
    url: urls.registration.url,
    condition: (user: UserState) => !!user.access,
    newUrl: urls.search.url,
  },
  {
    url: urls.purchase.url,
    condition: (user: UserState) => !user.access,
    newUrl: urls.registration.url,
  }
];

const LinkManager = ({children, to}: PropsLinkManager) => {
  const userData: UserState = useSelector((state: RootState) => state.user as UserState);
  const [newLink, setNewLink]: [string, Dispatch<SetStateAction<string>>] = useState(to);

  useEffect(() => {
    conditions.forEach(item => {
      if(to === item.url && item.condition(userData)) {
        setNewLink(item.newUrl);
      } else if(to === item.url) {
        setNewLink(to);
      }
    });
  }, [userData]);

  return (
    <Link to={newLink}>
      { children }
    </Link>
  );
};

export default LinkManager;