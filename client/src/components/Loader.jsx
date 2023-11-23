import { ImageList, Skeleton } from "@mui/material"

const Loader = ({ loadingMsg }) => {
  return (
    <div>
      {loadingMsg}
      <ImageList sx={{ maxWidth: 760, p: 2 }} cols={3}>
        <Skeleton variant="rectangular" width={100} height={100} />
      </ImageList>
    </div>
  )
}

export default Loader

// {coverArtUrls[currentPlaylistType].map((src) => (
//   <Paper key={uuidv4()} elevation={10} sx={{ m: 0.8 }}>
//   <ImageListItem sx={{ p: 1 }}>
//     <img src={src} />
//   </ImageListItem>
// </Paper>

// ))}