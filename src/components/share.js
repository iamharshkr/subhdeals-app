import {Share} from 'react-native';

const onShare = async data => {
  try {
    const result = await Share.share({
      title: 'Share Deals',
      message: `Hello,\nCheck out this awesome deal.\n\n${data.name} @ Rs.${data.SellPrice}\nLink: ${data.productUrl}\n\nThis deal is shared using Subhdeals. Visit https://deals.subhdeals.com/ for more awesome deals.`,
      url: data.productUrl,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default onShare;
