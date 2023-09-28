import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField
} from '@mui/material'

export const AddEnquiriesComponent = () => {
  return (
    <form>
      <Card>
        <CardHeader title={'Enquiries'} />
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Title" type="text" size="small" fullWidth required />

            <TextField
              label="Description"
              type="text"
              size="small"
              fullWidth
              required
              multiline
              rows={5}
            />
          </Stack>
        </CardContent>
        <CardActionArea>
          <CardActions>
            <Button variant="contained" color="success" type="submit">
              Submit
              {/* {isLoading ? 'Submitting' : 'Submit'} */}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </form>
  )
}
