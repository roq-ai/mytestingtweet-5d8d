import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getMediaById, updateMediaById } from 'apiSdk/media';
import { Error } from 'components/error';
import { mediaValidationSchema } from 'validationSchema/media';
import { MediaInterface } from 'interfaces/media';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { TweetInterface } from 'interfaces/tweet';
import { getTweets } from 'apiSdk/tweets';

function MediaEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MediaInterface>(
    () => (id ? `/media/${id}` : null),
    () => getMediaById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MediaInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMediaById(id, values);
      mutate(updated);
      resetForm();
      router.push('/media');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<MediaInterface>({
    initialValues: data,
    validationSchema: mediaValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Media
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
              <FormLabel>Type</FormLabel>
              <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
              {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="url" mb="4" isInvalid={!!formik.errors?.url}>
              <FormLabel>Url</FormLabel>
              <Input type="text" name="url" value={formik.values?.url} onChange={formik.handleChange} />
              {formik.errors.url && <FormErrorMessage>{formik.errors?.url}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<TweetInterface>
              formik={formik}
              name={'tweet_id'}
              label={'Select Tweet'}
              placeholder={'Select Tweet'}
              fetcher={getTweets}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.content}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'media',
    operation: AccessOperationEnum.UPDATE,
  }),
)(MediaEditPage);
