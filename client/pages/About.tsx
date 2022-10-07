import { ContributorCard } from '../components/ContributorCard';
import { incrementI } from '../redux/reducers/ContributorsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';


export const About = () => {
  const dispatch = useAppDispatch();
  const i = useAppSelector((state) => state.contributors.i);
  const names = useAppSelector((state) => state.contributors.names);
  const githubLinks = useAppSelector((state) => state.contributors.githubLinks);
  const linkedInLinks = useAppSelector((state) => state.contributors.linkedInLinks);
  const imageUrls = useAppSelector((state) => state.contributors.imageUrls);

  return (
    names.map((dev) => {
      return <ContributorCard name={names} />
    })
  );
};