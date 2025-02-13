import React, { useState, ChangeEvent, FormEvent, forwardRef } from 'react';
import { EmailFormData } from './types';
import {
  Box,
  Container,
  Stack,
  Heading,
  Input,
  Textarea,
  Button,
  Text,
  StackProps,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { motion, HTMLMotionProps } from 'framer-motion';

// Properly type the MotionBox
type MotionBoxProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};

const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>((props, ref) => (
  motion.div({ ...props, ref })
));

function App() {
  const [formData, setFormData] = useState<EmailFormData>({
    subject: '',
    message: '',
    recipients: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type === 'text/csv') {
      setFormData((prev) => ({
        ...prev,
        recipients: file,
      }));
    } else {
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.subject || !formData.message || !formData.recipients) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement email sending logic here
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(120deg, #fdfbfb 0%, #ebedee 100%)"
      py={12}
      px={4}
    >
      <Container maxW="container.md">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            bg="white"
            borderRadius="xl"
            p={8}
            boxShadow="xl"
          >
            <Stack>
              <Heading
                as="h1"
                size="xl"
                fontWeight="light"
                textAlign="center"
                color="gray.700"
              >
                Bulk Email Sender
              </Heading>

              <form onSubmit={handleSubmit}>
                <Stack>
                  <FormControl isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter email subject"
                      size="lg"
                      variant="outline"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message here..."
                      size="lg"
                      variant="outline"
                      rows={6}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Recipients</FormLabel>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      variant="outline"
                      size="lg"
                      css={{
                        '::file-selector-button': {
                          border: 'none',
                          backgroundColor: '#EBF8FF',
                          color: '#2B6CB0',
                          fontWeight: '500',
                          marginRight: '1rem',
                          cursor: 'pointer',
                          padding: '0.5rem 1rem',
                        }
                      }}
                    />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      Upload a CSV file containing email addresses
                    </Text>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    width="full"
                    loading={isLoading}
                    loadingText="Sending..."
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                  >
                    Send Emails
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default App; 