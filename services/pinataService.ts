const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzJlODE1OC00Zjg5LTQ0MTUtOGRjNS0xYjhiODE3ZjJhNGQiLCJlbWFpbCI6ImRpdmVyY2l0eXJlY29yZHNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI1NzQ2YmVlNGFkNzU2N2E3Y2QwIiwic2NvcGVkS2V5U2VjcmV0IjoiZDRmYzFhYmI2ZTZkMzExMDM3ZGIzMDA4NDI4NjkzNDE2OGQ2YWRiYjU0ZGE0MGUwM2QyZTNmYTJiZDBiMzE0ZiIsImV4cCI6MTgwNTMzMDgzMX0.TA89xqbX5ewCa-ef4YXooL5wzVaWXwfzG2LxbFOw-IU";

export const uploadJSONToIPFS = async (jsonBody: any) => {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify({
        pinataContent: jsonBody,
        pinataOptions: {
          cidVersion: 1,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error uploading to Pinata: ${response.statusText}`);
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw error;
  }
};

export const uploadFileToIPFS = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error uploading file to Pinata: ${response.statusText}`);
    }

    const data = await response.json();
    return `ipfs://${data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

export const resolveIPFSUrl = (url: string) => {
  if (!url) return "";
  
  // Handle standard ipfs:// protocol
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  }
  
  // Handle cases where the URI might just be the CID
  if (url.startsWith("Qm") || url.startsWith("bafy")) {
    return `https://gateway.pinata.cloud/ipfs/${url}`;
  }
  
  return url;
};
