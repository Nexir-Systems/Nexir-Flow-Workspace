import { Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { EntityFormValues } from '../model/entityFormSchema';

type Props = {
  register: UseFormRegister<EntityFormValues>;
  errors: FieldErrors<EntityFormValues>;
};

const sectionTitleSx = { fontWeight: 600, letterSpacing: '0.02em', color: 'text.primary' };

export function EntityFormFields({ register, errors }: Props) {
  return (
    <Stack spacing={0}>
      <Typography variant="subtitle2" sx={{ ...sectionTitleSx, mb: 2 }}>
        Basic information
      </Typography>
      <Stack spacing={2.5}>
        <TextField
          label="Name"
          fullWidth
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={4}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          {...register('description')}
        />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle2" sx={{ ...sectionTitleSx, mb: 2 }}>
        Classification
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
        <TextField
          select
          label="Status"
          fullWidth
          error={Boolean(errors.status)}
          helperText={errors.status?.message}
          {...register('status')}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          fullWidth
          error={Boolean(errors.category)}
          helperText={errors.category?.message}
          {...register('category')}
        >
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="billing">Billing</MenuItem>
          <MenuItem value="operations">Operations</MenuItem>
          <MenuItem value="security">Security</MenuItem>
        </TextField>
        <TextField
          select
          label="Priority"
          fullWidth
          error={Boolean(errors.priority)}
          helperText={errors.priority?.message}
          {...register('priority')}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </TextField>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle2" sx={{ ...sectionTitleSx, mb: 2 }}>
        Ownership
      </Typography>
      <TextField
        label="Owner"
        fullWidth
        error={Boolean(errors.owner)}
        helperText={errors.owner?.message}
        {...register('owner')}
      />
    </Stack>
  );
}
