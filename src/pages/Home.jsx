import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const {posts, tags} = useSelector((state) => state.posts);
  const [postsList, setPostsList] = React.useState(posts.items);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(()=> {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  React.useEffect(() => {
    if (activeTabIndex === 1) {
      
      const popularPosts = posts.items.slice().sort((a,b) => {
        return new Date(b.viewsCount) - new Date(a.viewsCount);
      });
      
      setPostsList(popularPosts);
    } else {
      const newPosts = posts.items.slice().sort((a,b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setPostsList(newPosts);
    }
  }, [activeTabIndex, dispatch, posts]);

  if(isPostsLoading) {
    return <Post isLoading={true}/>
  }

  console.log(postsList)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTabIndex} aria-label="basic tabs example">
        <Tab onClick={() => setActiveTabIndex(0)}  label="Новые" />
        <Tab onClick={() => setActiveTabIndex(1)} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
      <Grid xs={8} item>
          {postsList.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl ? `http://localhost:2525${post.imageUrl}`: ''}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={3}
              tags={post.tags}
              isEditable= {userData?._id === post.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};