import { Stack, TextField } from '@mui/material'

export function MuiTextField() {
    return (
        <Stack spacing={4}>
            <Stack direction='row' spacing={2}>
                <TextField label='Name'></TextField>
            </Stack>
        </Stack>
    )

}